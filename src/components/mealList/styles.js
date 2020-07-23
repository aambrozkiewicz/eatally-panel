import styled from 'styled-components';

export const Meals = styled.ul`
    list-style: none;
    padding: 0;
`;

export const Meal = styled.li`
    transition: all .3s ease-in-out;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
        transform: translate3d(0px, -1px, 0px);
    }
`;
