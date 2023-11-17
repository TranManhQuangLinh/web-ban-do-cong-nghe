import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperCategory = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 43px;
    background-color: white;
    border-radius: 4px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #9255FD;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    padding-top: 20px;
    flex-wrap: wrap;
`