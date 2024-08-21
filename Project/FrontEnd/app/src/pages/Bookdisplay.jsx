import { ReactReader } from 'react-reader'
import {useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { useLocation } from 'react-router-dom';

const Bookdisplay = ({url}) => {
    const url2 = `http://localhost:8080/files/${url}`
    const [location, setLocation] = useState(0)
    return (
      <div style={{ height: '100vh' }}>
        <ReactReader
          url = {url2}
          location={location}
          locationChanged={(epubcfi) => setLocation(epubcfi)}
        />
      </div>
    )
  }

  export default Bookdisplay;