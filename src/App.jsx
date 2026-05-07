import { useState } from 'react'

function App() {
  const [monto, setMonto] = useState('');
  const [plazo, setPlazo] = useState('');
  const [tasa, setTasa] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);
    try {
      const response = await fetch('http://localhost:8000/api/prestamos/simular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          monto: parseFloat(monto),
          plazo_meses: parseInt(plazo),
          tasa_anual: parseFloat(tasa),
        }),
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      setResultado(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="simulator-card">
        <h1>Simulador de Cuota de Préstamo</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Monto:</label>
            <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Plazo en meses:</label>
            <select value={plazo} onChange={(e) => setPlazo(e.target.value)} required>
              <option value="">Selecciona un plazo</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
              <option value="30">30 meses</option>
              <option value="36">36 meses</option>
              <option value="42">42 meses</option>
              <option value="48">48 meses</option>
              <option value="54">54 meses</option>
              <option value="60">60 meses</option>
            </select>
          </div>
          <div className="input-group">
            <label>Tasa anual (%):</label>
            <input type="number" step="0.01" value={tasa} onChange={(e) => setTasa(e.target.value)} required />
          </div>
          <div className="button-container">
            <button type="submit">Simular</button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        {resultado && resultado.success && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button
        className="close-btn"
        onClick={() => setResultado(null)}
      >
        ✕
      </button>

      <h2>Resultado de la Simulación</h2>

      <div className="result-grid">
        <div className="result-item">
          <div className="label">Monto Solicitado</div>
          <div className="value">S/ {resultado.data.monto}</div>
        </div>

        <div className="result-item">
          <div className="label">Cuota Mensual</div>
          <div className="value">S/ {resultado.data.cuota_mensual}</div>
        </div>

        <div className="result-item">
          <div className="label">Total Intereses</div>
          <div className="value">S/ {resultado.data.total_intereses}</div>
        </div>

        <div className="result-item">
          <div className="label">ITF</div>
          <div className="value">S/ {resultado.data.itf}</div>
        </div>

        <div className="result-item">
          <div className="label">Importe a Recibir</div>
          <div className="value">S/ {resultado.data.importe_a_recibir}</div>
        </div>

        <div className="result-item">
          <div className="label">Total a Pagar</div>
          <div className="value">S/ {resultado.data.total_a_pagar}</div>
        </div>

        <div className="result-item">
          <div className="label">Plazo en Meses</div>
          <div className="value">{resultado.data.plazo_meses}</div>
        </div>

        <div className="result-item">
          <div className="label">Tasa Anual (%)</div>
          <div className="value">{resultado.data.tasa_anual}%</div>
        </div>

        <div className="result-item">
          <div className="label">TEM (%)</div>
          <div className="value">
            {(resultado.data.tem_pct * 100).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        {resultado && !resultado.success && (
          <p className="error">La simulación no fue exitosa. Verifica los datos.</p>
        )}
      </div>
    </div>
  );
}

export default App
