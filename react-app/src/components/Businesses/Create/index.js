import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getAllBusinessesThunk } from '../../../store/business';
import CreateABusiness from './CreateBusinessModal';


function AddBusinessModal(user) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const onCloseAction = () => {
    setShowModal(false)
    dispatch(getAllBusinessesThunk)

  }

  const thing = () =>{
    setShowModal(true)
    console.log(showModal)
  }
  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Add a business to HELP</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          {/* <CreateABusiness setShowModal={setShowModal}/> */}
        </Modal>
      )}
    </>
  );
}

export default AddBusinessModal;
