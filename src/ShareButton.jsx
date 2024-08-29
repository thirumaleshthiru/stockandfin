import React, { useState } from 'react';
import './CSS/ShareButton.css'
import { FaRegShareFromSquare } from "react-icons/fa6";


function ShareButton() {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setShowModalMessage] = useState('')

    const handleShare = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                setShowModal(true);
                setShowModalMessage('Link copied to clipboard!')

            })
            .catch((error) => {
                setShowModalMessage('Failed to Copy the Link!')
            });
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button onClick={handleShare} className='share'><FaRegShareFromSquare /></button>
            {showModal && (
                <div className="modal-container">
                    <div className="modal">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default ShareButton;
