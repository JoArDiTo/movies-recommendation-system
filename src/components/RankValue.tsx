import React, { useState } from "react"

export const RankValue = () => {
    const [rating, setRating] = useState(0)
    const [showModal, setShowModal] = useState(false)

    function handleRating(value: number) {
        setRating(value)
        setShowModal(true)
    }

    function closeModal(){
        setShowModal(false)
    }

    return (
        <>
            <div className="flex space-x-4">
                {
                    [1, 2, 3, 4, 5].map((value) => (
                        <button
                            className="bg-blue-500 text-white text-2xl px-4 py-2 rounded transition hover:bg-blue-700 hover:scale-110"
                            onClick={() => handleRating(value)}
                            key={value}
                        >
                            {value}
                        </button>
                    ))
                }
            </div>
            {
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-75">
                        <div className="bg-slate-500 p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Gracias por su experiencia!</h2>
                        <p className="mb-4">Calificaste nuestro sistema con {rating} estrellas.</p>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}