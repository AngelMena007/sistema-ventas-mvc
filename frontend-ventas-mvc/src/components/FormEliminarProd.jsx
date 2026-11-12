import { useState } from "react";

function FormEliminarProd({ onEliminar }) {
    const [id, setId] = useState("");

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const eliminado = await onEliminar(Number(id));
        if (eliminado) {
            setId("");
        }
    };

    return (
        <div>
            <form className="form-eliminar-prod" onSubmit={manejarEnvio}>
                <h2>Eliminar Producto</h2>
                <div>
                    <label htmlFor="producto-id">ID del Producto: </label>
                    <input
                        id="producto-id"
                        type="number"
                        min="1"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Eliminar Producto</button>
            </form>
        </div>
    );
}

export default FormEliminarProd;