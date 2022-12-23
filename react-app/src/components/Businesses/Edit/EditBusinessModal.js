
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { editBusinessThunk } from "../../../store/business";
import { getSingleBusinessThunk } from "../../../store/business";



export default function EditABusiness({setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const User = useSelector(state => state.session.user)
    const business = useSelector(state => state.business.oneBusiness)
    const [businessName,setBusinessName] = useState(business.business_name || '');
    const [phone,setPhone] = useState(business.phone || '');
    const [streetAddress,setStreetAddress] = useState(business.street_address || '');
    const [city,setCity] = useState(business.city || '');
    const [state,setState] = useState(business.state || '');
    const [zipcode,setZipcode] = useState(business.zipcode || '');
    const [description,setDescription] = useState(business.description || '');
    const [type, setType] = useState(business.type || '');

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
          id: business.id,
          owner_id: business.owner_id,
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
        await dispatch(editBusinessThunk(business))

      setShowModal(false)
      dispatch(getSingleBusinessThunk(business.id))
      history.push(`/business/${business.id}`)
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
        {validationErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
            <h2>Buisness Information</h2>
            <label>
                <input
                    placeholder="business name"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="Address"
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="Zipcode"
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    placeholder=" Business Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
            <select name="type"
            onChange={(e) => setType(e.target.value)}>
              <option value="">--Business Type--</option>
              <option value="Vehicle Repair">Vehicle Repair</option>
              <option value="Home Repair">Home Repair</option>
              <option value="Self Care">Self Care</option>
              <option value="Restaurant">Restaurant</option>
            </select>
            </label>
            <div>
            <button type="submit" disabled={validationErrors.length}>Edit</button>
            </div>
        </form>

    )
}
