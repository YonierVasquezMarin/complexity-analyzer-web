import { useState, useImperativeHandle, forwardRef } from 'react';
import type { ModalDataProvider } from '../models/ModalDataModel';
import type { NameForNewFileModel } from '../models/ModalDataModel';

interface NewFileNameFormComponentProps {}

const NewFileNameFormComponent = forwardRef<ModalDataProvider<NameForNewFileModel>, NewFileNameFormComponentProps>(
  (props, ref) => {
    const [fileName, setFileName] = useState('');

    useImperativeHandle(ref, () => ({
      getData: (): NameForNewFileModel => {
        return {
          fileName: fileName.trim(),
        };
      },
    }));

    return (
      <div className="flex flex-col gap-3">
        <label htmlFor="fileName" className="text-white text-sm font-medium">
          Nombre del archivo
        </label>
        <input
          id="fileName"
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Ingrese el nombre del archivo"
          className="px-4 py-2 bg-[#1a1a2e] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
      </div>
    );
  }
);

NewFileNameFormComponent.displayName = 'NewFileNameFormComponent';

export default NewFileNameFormComponent;

