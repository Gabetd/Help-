import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createBusinessThunk } from "../../../store/business";
import { getSingleBusinessThunk } from "../../../store/business";
import PhoneInput from 'react-phone-number-input'
import '../../omega.css'


export default function CreateABusiness() {
    const dispatch = useDispatch()
    const history = useHistory()
    const User = useSelector(state => state.session.user)
    // const [ownerId, setOwnerId] = useState('');
    const [businessName,setBusinessName] = useState('');
    const [Img, setImg] = useState('');
    const [phone,setPhone] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [zipcode,setZipcode] = useState('');
    const [description,setDescription] = useState('');
    const [type, setType] = useState("Restaurant");

    // console.log('Clicked')
    const [validationErrors, setValidationErrors] = useState([])

    /* Validation errors for form */
    useEffect(() => {
        const validationErrors = [];
        setValidationErrors(validationErrors);
    }, []);

    const handleSubmit = async (e) => {
      console.log('made it to submit')
        e.preventDefault();
        const business = {
          owner_id: User.id,
          preview_img: Img,
          business_name: businessName,
          phone,
          street_address: streetAddress,
          city,
          zipcode,
          state,
          description,
          business_type: type
        }
        console.log('payload = ', business)
        const data = await dispatch(createBusinessThunk(business))
        console.log(data)
    if(data){
      dispatch(getSingleBusinessThunk(data.id))
      history.push(`/business/${data.id}`)
      // setShowModal(false)
    }

    }

    if(!User){
        history.push('/')
    }

    return (
        <form className="CreateForm" onSubmit={handleSubmit}>
            <div >
        {validationErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
            <h2>Buisness Information</h2>
            {/* <h3>GO BACK TO CREATE BUSINESS MODAL.JS TO FIX THIS</h3> */}
            <label>
                <input
                    className="input"
                    placeholder="business name"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                />
            </label>
            <label>
            <input
                    className="input"
                    placeholder="Preview Image"
                    type="text"
                    value={Img}
                    onChange={(e) => setImg(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    className="input"
                    placeholder="Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    className="input"
                    placeholder="Address"
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    className="input"
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    className="input"
                    placeholder="Zipcode"
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    className="input"
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    className="input"
                    placeholder="Business Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
            <select name="Type"
            // placeho="Business Type"
            onChange={(e) => setType(e.target.value)}>
              {/* <option value="">-- --</option> */}
              <option value="Restaurant">Restaurant</option>
              <option value="Vehicle Repair">Vehicle Repair</option>
              <option value="Home Repair">Home Repair</option>
              <option value="Self Care">Self Care</option>
            </select>
            </label>
            <div>
            <button type="submit" disabled={validationErrors.length}>Create</button>
            </div>
        </form>

    )
}
