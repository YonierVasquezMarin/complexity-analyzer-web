import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import AreaToEditCodeComponent from '../components/AreaToEditCodeComponent';
import AnalysisResultsComponent from '../specific-components/AnalysisResultsComponent';
import SelectedItemNameComponent from '../components/SelectedItemNameComponent';

function AnalysisPage() {
  const navigate = useNavigate();
  const { selectedItem } = usePseudocodeAnalysis();

  useEffect(() => {
    // Si no hay item seleccionado, redirigir
    if (!selectedItem) {
      navigate(-1);
    }
  }, [selectedItem, navigate]);

  // Si no hay item, no renderizar nada (el useEffect manejará la redirección)
  if (!selectedItem) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#1e1e2e]">
        {/* Puedes agregar un mensaje o simplemente dejar el fondo plano */}
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Sección izquierda - 30% */}
      <div className="w-[30%] h-full bg-[#1e1e2e] flex flex-col overflow-hidden">
        <SelectedItemNameComponent />
        <AreaToEditCodeComponent readOnly={true} />
      </div>

      {/* Sección derecha - 70% */}
      <div className="w-[70%] h-full bg-[#1e1e2e] flex flex-col overflow-hidden">
        <AnalysisResultsComponent />
      </div>
    </div>
  );
}

export default AnalysisPage;

