import ButtonComponent from '../shared/ButtonComponent';
import { FiUpload, FiPlus } from 'react-icons/fi';
import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';
import { PseudocodeAnalysisService } from '../services/PseudocodeAnalysisService';
import type { PseudocodeAnalysisModel } from '../models/PseudocodeAnalysisModel';
import { ModalService } from '../services/ModalService';
import NewFileNameFormComponent from './NewFileNameFormComponent';
import type { NameForNewFileModel } from '../models/ModalDataModel';

function ControlsForFilesSpecificComponent() {
  const { addItem } = usePseudocodeAnalysis();

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    // Primero, leer todos los archivos .txt en paralelo
    const filePromises: Array<Promise<{ name: string; content: string }>> = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Verificar que sea un archivo .txt
      if (!file.name.toLowerCase().endsWith('.txt')) {
        console.warn(`El archivo "${file.name}" no es un archivo .txt y será omitido.`);
        continue;
      }

      // Agregar la promesa de lectura del archivo
      filePromises.push(
        readFileAsText(file).then(content => ({
          name: file.name,
          content,
        })).catch(error => {
          console.error(`Error al leer el archivo "${file.name}":`, error);
          throw error;
        })
      );
    }

    // Esperar a que todos los archivos se lean
    const fileDataArray = await Promise.all(filePromises);

    // Ahora guardar todos los archivos de forma secuencial para asegurar IDs únicos
    for (const fileData of fileDataArray) {
      try {
        // Obtener el siguiente ID disponible
        const nextId = PseudocodeAnalysisService.getNextId();
        
        // Crear el modelo con id consecutivo
        const newModel: PseudocodeAnalysisModel = {
          id: nextId,
          fileName: fileData.name,
          pseudocode: fileData.content,
        };

        // Agregar el modelo usando el contexto
        addItem(newModel);
      } catch (error) {
        console.error(`Error al guardar el archivo "${fileData.name}":`, error);
      }
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          resolve(event.target.result);
        } else {
          reject(new Error('No se pudo leer el contenido del archivo'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };
      
      reader.readAsText(file);
    });
  };

  const handleCreateNewFile = (data: NameForNewFileModel) => {
    if (data.fileName.trim()) {
      const nextId = PseudocodeAnalysisService.getNextId();
      const newModel: PseudocodeAnalysisModel = {
        id: nextId,
        fileName: data.fileName.trim(),
        pseudocode: '',
      };
      addItem(newModel);
    }
  };

  const handleNewFileClick = () => {
    ModalService.showModal<NameForNewFileModel>({
      title: 'Nuevo Archivo',
      size: 'md',
      content: <NewFileNameFormComponent />,
      labelYes: 'Ok',
      labelNo: 'Cancelar',
      actionForYes: handleCreateNewFile,
      actionForNo: () => {
        // No hacer nada al cancelar
      },
    });
  };

  return (
    <div className="flex gap-2">
      <ButtonComponent
        leftIcon={<FiUpload />}
        label="Subir Archivo"
        onFilesSelected={handleFilesSelected}
        multiple={true}
        accept=".txt"
        variant="primary"
        size="md"
        onClick={() => {}}
      />
      <ButtonComponent
        leftIcon={<FiPlus />}
        variant="blue-outline"
        size="md"
        onClick={handleNewFileClick}
      />
    </div>
  );
}

export default ControlsForFilesSpecificComponent;

