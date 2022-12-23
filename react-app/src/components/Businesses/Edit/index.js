import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { getAllBusinessesThunk } from '../../../store/business';
import EditABusiness from './EditBusinessModal';


function EditBusinessModal(user) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const onCloseAction = () => {
    setShowModal(false)
    dispatch(getAllBusinessesThunk())
  }

  return (
    <>
      <button
      onClick={() => setShowModal(true)}>Edit Your Business</button>
      {showModal && (
        <Modal onClose={() => onCloseAction()}>
          <EditABusiness setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditBusinessModal;
