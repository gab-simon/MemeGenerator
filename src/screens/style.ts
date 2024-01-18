import styled from "styled-components/native";
import { colors } from "../utils/theme";

export const Container = styled.View`
    flex: 1;
    background-color: ${colors.background_primary};
`;

export const Content = styled.View`
    flex: 1;
    padding: 0 20px;
`;

export const Header = styled.View`
    width: 100%;
    height: 100px;
    justify-content: flex-end;
    padding: 0 20px;
`;

export const Title = styled.Text`
    font-size: 18px;
`;

export const Image = styled.Image`
    width: 100%;
    height: 70%;
`;

export const Description = styled.Text`
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const Box = styled.View`
    width: 100%;
    padding: 0px 20px 20px 20px;
`;

export const Logo = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 500px;
`;

