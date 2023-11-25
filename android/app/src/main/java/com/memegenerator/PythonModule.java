package com.memegenerator;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;

import com.chaquo.python.PyObject;
import com.chaquo.python.Python;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.sql.Date;
import java.sql.Timestamp;


public class PythonModule extends ReactContextBaseJavaModule {
    Context context;
    String TAG = "Python Running";
    Python py = Python.getInstance();
    PyObject pyobj = py.getModule("script");

    PythonModule(ReactApplicationContext context) {
        super(context);
        this.context = context.getApplicationContext();
    }


    @NonNull
    @Override

    public String getName() {
        return "PythonModule";
    }


    @ReactMethod
    public void InvokePython() {
        PyObject obj = pyobj.callAttr("main");
         Toast.makeText(getReactApplicationContext(),"Invoke Python ",Toast.LENGTH_SHORT).show();

        String str = obj.toString();

        byte data[] = android.util.Base64.decode(str, Base64.DEFAULT);
        Bitmap bmp = BitmapFactory.decodeByteArray(data,0,data.length); //convert to  bitmap
        //        SET IMAGE AFTER THAT
        Log.d(TAG, "memegenerator: "+bmp);
        Toast.makeText(getReactApplicationContext(),"Memegenerator to be Bitmap " + bmp,Toast.LENGTH_SHORT).show();
        convertImageFromBitmap(bmp);
        storageImage(bmp,"meme");
        WritableMap arr = Arguments.createMap();
    }


   public String storageImage(Bitmap bitmap, String name) {
       File sd = Environment.getExternalStorageDirectory();
       String filesDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).toString()+ "/Camera/";
        File imageFile = new File(filesDir, name+ ".jpg");
        OutputStream os;
        try {
            os = new FileOutputStream(imageFile);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, os);
            os.flush();
            os.close();
            Log.d(TAG, "persistImage: "+filesDir+ "keep spirit");
        } catch (Exception e) {
            Log.d("hello", "Error due to i havent sleep", e);
        }
        return imageFile.toString();
    }

    public String convertImageFromBitmap(Bitmap bitmap) {
        String parse = "";
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
       try {
           bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bytes);
           String path = MediaStore.Images.Media.insertImage(getReactApplicationContext().getContentResolver(), bitmap, "Title", null);
           Log.d(TAG, "convertImageFromBitmap: "+ Uri.parse(path));
           parse = Uri.parse(path).toString();
           Toast.makeText(getReactApplicationContext(),"Check Your file  " + parse + Uri.parse((path)),Toast.LENGTH_SHORT).show();
           return parse;
       }catch (Exception err){
           Toast.makeText(getReactApplicationContext(),"Failed",Toast.LENGTH_SHORT).show();

       }
       return parse ;
    }

    @SuppressLint("LongLogTag")
    public String returnFile (Bitmap bitmap, String name) {
        File sd = Environment.getExternalStorageDirectory();
        String filesDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).toString()+ "/Camera/";
        File imageFile = new File(filesDir, name+ ".jpg");
        OutputStream os;
        try {
            os = new FileOutputStream(imageFile);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, os);
            os.flush();
            os.close();

            Log.d(TAG, "persistImage: "+filesDir+ "kosong");
               Toast.makeText(getReactApplicationContext(),"Check Your file  " + filesDir,Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Log.d("Error due to i havent sleep", "i need a sleep", e);
        }
        return  imageFile.toString();
    }

    @ReactMethod
    public void processMeme (String path, Promise promise) {
        PyObject pyScript  = py.getModule("script");
        PyObject obj = pyScript.callAttr("main", path);
        Log.d(TAG, "processMeme: "+obj+" "+path);
        Toast.makeText(getReactApplicationContext(),"Pr " + obj,Toast.LENGTH_SHORT).show();
        String str = obj.toString();


        byte data[] = android.util.Base64.decode(str, Base64.DEFAULT);
        Bitmap bmp = BitmapFactory.decodeByteArray(data,0,data.length); //convert to  bitmap
        //        SET IMAGE AFTER THAT
        Log.d(TAG, "generateMathplotlib: "+bmp);
         Timestamp timestamp = new Timestamp(System.currentTimeMillis());
         Toast.makeText(getReactApplicationContext(),"Processing...  " + bmp,Toast.LENGTH_SHORT).show();
        String loc = returnFile(bmp,"meme"+ timestamp.getTime());
        
        
        try {
            promise.resolve(loc);
        } catch(Exception e) {
            promise.reject("Error due to i havent sleep", e);
        }
    }


}

