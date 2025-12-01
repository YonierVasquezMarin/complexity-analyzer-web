import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import AreaToEditCodeComponent from '../components/AreaToEditCodeComponent';
import AnalysisResultsComponent from '../specific-components/AnalysisResultsComponent';

function AnalysisPage() {
  const navigate = useNavigate();
  const { selectedItem, executeAnalysisInThisMoment, setExecuteAnalysisInThisMoment } = usePseudocodeAnalysis();
  const [currentItem, setCurrentItem] = useState<PseudocodeAnalysisModel | null>(null);
  const [shouldExecuteAnalysis, setShouldExecuteAnalysis] = useState<boolean>(false);

  useEffect(() => {
    // Esperar un pequeño tiempo para que el estado global se cargue
    const timer = setTimeout(() => {
      if (selectedItem) {
        setCurrentItem(selectedItem);
        // Si executeAnalysisInThisMoment es true, marcar para ejecutar el análisis
        if (executeAnalysisInThisMoment) {
          setShouldExecuteAnalysis(true);
        }
      } else {
        // Si no hay item seleccionado, redirigir
        navigate(-1);
      }
    }, 100); // Pequeño delay de 100ms para asegurar que el estado se cargue

    return () => clearTimeout(timer);
  }, [selectedItem, executeAnalysisInThisMoment, navigate]);

  useEffect(() => {
    // Ejecutar el análisis si está marcado para ejecutarse
    if (shouldExecuteAnalysis && currentItem) {
      console.log('Ejecutar análisis para ID:', currentItem.id);
      console.log('Pseudocódigo obtenido:', currentItem);
      // TODO: Implementar lógica adicional para ejecutar el análisis con el pseudocódigo
      setShouldExecuteAnalysis(false); // Resetear después de ejecutar
    }
  }, [shouldExecuteAnalysis, currentItem]);

  // Limpiar executeAnalysisInThisMoment al desmontar el componente (al salir de la página)
  useEffect(() => {
    return () => {
      setExecuteAnalysisInThisMoment(false);
    };
  }, [setExecuteAnalysisInThisMoment]);

  // Si no hay item, no renderizar nada (el useEffect manejará la redirección)
  if (!currentItem) {
    return null;
  }

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Sección izquierda - 30% */}
      <div className="w-[30%] h-full bg-[#1e1e2e] flex flex-col overflow-hidden">
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

