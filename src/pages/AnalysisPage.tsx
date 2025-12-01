import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import { PseudocodeAnalysisService } from '../services/PseudocodeAnalysisService';
import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import AreaToEditCodeComponent from '../components/AreaToEditCodeComponent';
import AnalysisResultsComponent from '../specific-components/AnalysisResultsComponent';

function AnalysisPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectItem } = usePseudocodeAnalysis();
  const [currentItem, setCurrentItem] = useState<PseudocodeAnalysisModel | null>(null);
  const idParam = searchParams.get('id');
  const executeAnalysis = searchParams.get('executeAnalysis');

  useEffect(() => {
    // Obtener el item directamente del servicio usando el ID de la URL
    if (idParam) {
      const pseudocodeId = parseInt(idParam, 10);
      if (!isNaN(pseudocodeId)) {
        // Usar el servicio directamente para evitar problemas de timing con el contexto
        const pseudocodeItem = PseudocodeAnalysisService.getById(pseudocodeId);
        if (pseudocodeItem) {
          setCurrentItem(pseudocodeItem);
          // Seleccionar el item en el contexto para que otros componentes puedan usarlo
          selectItem(pseudocodeItem);
        } else {
          console.error('No se encontró el pseudocódigo con ID:', pseudocodeId);
          navigate(-1);
        }
      } else {
        navigate(-1);
      }
    } else {
      // Si no hay ID en la URL, redirigir
      navigate(-1);
    }
  }, [idParam, navigate, selectItem]);

  useEffect(() => {
    // Capturar el parámetro executeAnalysis y ejecutar el análisis
    if (executeAnalysis === 'true' && currentItem) {
      console.log('Ejecutar análisis para ID:', currentItem.id);
      console.log('Pseudocódigo obtenido:', currentItem);
      // TODO: Implementar lógica adicional para ejecutar el análisis con el pseudocódigo
    }
  }, [executeAnalysis, currentItem]);

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

