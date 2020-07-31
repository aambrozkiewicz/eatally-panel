import styled from 'styled-components';

export const HooverBox = styled.div`
    background-color: #fff;
    transition: all .3s ease-in-out;
    font-size: 0.9rem;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
        transform: translate3d(0px, -1px, 0px);
    }
`;

export const Paper = styled.div`
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 0; bottom: 0; left: 0;
        width: 55px;
        background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
        background-size: 30px 30px;
        background-position-x: 5px;
        border-right: 2px solid rgba(255, 0, 0, 0.4);
    }
`;

export const Lines = styled.div`
    background-image: repeating-linear-gradient(#fffee0 0px, #fffee0 24px, steelblue 25px);
    min-height: 74px;
    padding: 0 10px 17px 77px;
    line-height: 25px;
`;