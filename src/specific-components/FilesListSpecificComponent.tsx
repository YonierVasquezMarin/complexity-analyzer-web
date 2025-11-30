import { usePseudocodeAnalysis } from '../context/PseudocodeAnalysisContext';

function FilesListSpecificComponent() {
  const { items } = usePseudocodeAnalysis();

  const getFileNameWithoutExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };

  return (
    <div className="mt-5">
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">No hay archivos guardados</p>
      ) : (
        <ul className="space-y-5">
          {items.map((item) => (
            <li
              key={item.id}
              className="text-white text-sm p-2 bg-[#3a3a4e] rounded hover:bg-[#4a4a5e] cursor-pointer transition-colors"
            >
              {getFileNameWithoutExtension(item.fileName)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilesListSpecificComponent;

