import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import AreaToEditCodeComponent from '../components/AreaToEditCodeComponent';
import AnalysisResultsComponent from '../specific-components/AnalysisResultsComponent';

function AnalysisPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedItem } = usePseudocodeAnalysis();
  const executeAnalysis = searchParams.get('executeAnalysis');

  useEffect(() => {
    // Si no hay item seleccionado, redirigir a la página anterior
    if (!selectedItem) {
      navigate(-1);
    }
  }, [selectedItem, navigate]);

  useEffect(() => {
    // Capturar el parámetro executeAnalysis
    if (executeAnalysis === 'true') {
      // TODO: Implementar lógica para ejecutar el análisis
      console.log('Ejecutar análisis:', executeAnalysis);
    }
  }, [executeAnalysis]);

  // Si no hay item seleccionado, no renderizar nada (el useEffect manejará la redirección)
  if (!selectedItem) {
    return null;
  }

  return (
    <div className="w-full h-screen flex">
      {/* Sección izquierda - 30% */}
      <div className="w-[30%] h-full bg-[#1e1e2e] flex flex-col">
        <AreaToEditCodeComponent readOnly={true} />
      </div>

      {/* Sección derecha - 70% */}
      <div className="w-[70%] h-full bg-[#1e1e2e] flex flex-col">
        <AnalysisResultsComponent />
      </div>
    </div>
  );
}

export default AnalysisPage;

