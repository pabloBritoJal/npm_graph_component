import React, { useEffect, useState } from "react";

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  return (
    <div className="graph-modal-overlay">
      <div className="graph-modal-content">
        {isMounted && children}
      </div>
    </div>
  );
};

export default Modal;
