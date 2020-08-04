import styled from "styled-components";

const Sidebar = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 88vw;
    z-index: 1;
    transition: transform .5s ease;
    transform: ${props => props.open ? `translateX(0)` : `translateX(400px)`};

    @media (min-width: 992px) {
        width: 400px;
        transform: ${props => props.open ? `translateX(0)` : `translateX(400px)`};
    }
`;

export default Sidebar;
