import FilesManagerComponent from '../components/FilesManagerComponent';
import CodeEditorComponent from '../components/CodeEditorComponent';

function HomePage() {
  return (
    <div className="app-container">
      <FilesManagerComponent />
      <CodeEditorComponent />
    </div>
  );
}

export default HomePage;

