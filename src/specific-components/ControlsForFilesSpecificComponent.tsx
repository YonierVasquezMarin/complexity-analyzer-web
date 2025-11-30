import ButtonComponent from '../shared/ButtonComponent';
import { FiUpload } from 'react-icons/fi';

function ControlsForFilesSpecificComponent() {
  return (
    <div>
      <ButtonComponent
        leftIcon={<FiUpload />}
        onClick={() => {}}
        variant="default"
        size="md"
      />
    </div>
  );
}

export default ControlsForFilesSpecificComponent;

