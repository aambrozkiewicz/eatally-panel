import React, { useRef } from "react";
import { DrawerElement, Overlay } from "./styles";
import { useOnClickOutside } from "../../hooks";

function Drawer({ children, open, onClose }) {
  const ref = useRef();

  useOnClickOutside(ref, () => onClose && onClose());

  return (
    <>
      <Overlay open={open} />
      <DrawerElement ref={ref} open={open}>
        {children}
      </DrawerElement>
    </>
  );
}

export default Drawer;
