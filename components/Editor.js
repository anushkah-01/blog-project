import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
