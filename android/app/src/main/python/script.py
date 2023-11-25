import cv2 as cv
import sys
import numpy as np
import random
# import getopt
import os
from PIL import Image
import io
import base64

# def getScriptArguments(argv):
#     global set_figure
#     global set_model
#     arg_help = 'Comando incorreto.'
    
#     try:
#         opts, args = getopt.getopt(argv[1:], 'f:t:', ['figure', 'template'])
#     except:
#         print(arg_help) 
#         sys.exit(2)
    
#     # Treat script arguments
#     for opt, arg in opts:
#         if opt in ('-f', '--figure'):
#             set_figure = arg
#             if(os.path.exists(os.path.join('./',set_figure)) == False):
#                 print(f'Arquivo {set_figure} não existe!')
#                 quit()
#         if opt in ('-t', '--template'):
#             set_model = arg
#             if(os.path.exists(os.path.join('./',set_model)) == False):
#                 print(f'Arquivo {set_figure} não existe!')
#                 quit()

def main(pfigure):
    set_figure = ''
    set_model = ''
    # path = (__file__)
    # path = os.path.dirname(os.path.abspath(__file__))
    
    path = os.path.dirname(os.path.realpath(__file__))
    path_model = os.path.join(os.path.dirname(os.path.realpath(__file__)), "models")
    path_figure = os.path.join(os.path.dirname(os.path.realpath(__file__)), "figures")
    
    if pfigure != '':
        set_figure = pfigure
        
    # return "pfigure"+pfigure

    # if __name__ == "__main__":
    #     getScriptArguments(sys.argv)

    # return files
    
    # Load template and figure
    if pfigure != '':
        set_figure = pfigure
        # return "set_figure"+set_figure
        if os.path.exists(set_figure) == False:
            return "Arquivo {set_figure} não existe!"
        
        figure = cv.imread(set_figure)
    else:
        file = random.choice(os.listdir(path_figure))
        figure = cv.imread(os.path.join(path_figure, file))
    if set_model == '':
        file_model = random.choice(os.listdir(path_model))
        template = cv.imread(os.path.join(path_model, file_model))
    else:
        file_model = set_model
        template = cv.imread(file_model)

    if figure is None:
        return "Failed to load figure image from {figure}"
    if template is None:
        return "Failed to load template image from {template}"
    
    # Resize figure for image operations
    figure = cv.resize(figure, (template.shape[1], template.shape[0]))

    # Set blank image
    blank = template.copy()
    blank[:,:] = (0,0,0)

    # Set the lower and upper green
    lower_green = np.array([23,255,17])
    upper_green = np.array([23,255,17])

    # Set the masks
    mask = cv.inRange(template, lower_green, upper_green)
    mask_inv = cv.bitwise_not(mask)

    # Set contours
    contours, hierarchy = cv.findContours(mask, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    contour = np.zeros((mask.shape[0], mask.shape[1]), np.uint8)
    cv.drawContours(contour, contours, 0, (255, 255, 255), 3)

    # Find the size of the green box
    x,y,w,h = cv.boundingRect(contour)
    widht = w
    height = h

    # Resize the figure to box size
    resized = cv.resize(figure, (widht, height))

    # Overlay blank image
    blank[y:y+h, x:x+w] = resized

    # Apply the mask to the figure image
    figure_masked = cv.bitwise_and(blank, blank, mask=mask)

    # Apply the inverted mask to the template image
    template_masked = cv.bitwise_and(template, template, mask=mask_inv)

    # combine the masked figure and template images
    result = cv.add(template_masked, figure_masked)
    img_rgb = cv.cvtColor(result, cv.COLOR_BGR2RGB)


    pil_im = Image.fromarray(img_rgb)
    buff = io.BytesIO()
    pil_im.save(buff,format="PNG")
    img_str = base64.b64encode(buff.getvalue())
    return ""+str(img_str,'utf-8')