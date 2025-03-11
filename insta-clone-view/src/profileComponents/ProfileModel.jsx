import React from 'react';

export default function ProfileModal({ open, onClose, children }) {

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={e => e.stopPropagation()} className={` rounded-xl shadow transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                {children}
            </div>
        </div>
    );
}
