import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createBusinessThunk } from "../../../store/business";
import { getSingleBusinessThunk } from "../../../store/business";
import { createPreviewImageThunk } from "../../../store/business";
import '../../omega.css'



export default function CreateABusiness() {
    const dispatch = useDispatch()
    const history = useHistory()
    const User = useSelector(state => state.session.user)
    // const [ownerId, setOwnerId] = useState('');
    const [businessName,setBusinessName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [zipcode,setZipcode] = useState('');
    const [description,setDescription] = useState('');
    const [type, setType] = useState("Restaurant");


    const [validationErrors, setValidationErrors] = useState([])

    /* Validation errors for form */
    useEffect(() => {
        const Errors = [];
        if(phone.length !== 10) Errors.push('Please enter a valid phone number')
        if(zipcode.length !== 5) Errors.push('Please enter a valid zipcode')
        if(businessName.length > 100 || businessName.length < 3) Errors.push('Business Name must be between 3 and 100 characters')
        if(!image) Errors.push('Please choose an image of type png or jpg only')
        if(image.length > 2000) Errors.push('Please use a different image')
        if(streetAddress.length > 100 || streetAddress.length < 3) Errors.push('Street Address must be between 3 and 100 characters')
        if(city.length > 100 || city.length < 3) Errors.push('City must be between 3 and 100 characters')
        if(state.length > 100 || state.length < 2) Errors.push('Please enter a valid state')
        if(description.length > 100 || description.length < 3) Errors.push('Description must be between 3 and 3000 characters')
        setValidationErrors(Errors);
    }, [phone, zipcode, description, state, image, streetAddress, city ]);



    const handleSubmit = async () => {
            const business = {
                owner_id: User.id,
                preview_img: image,
                business_name: businessName,
                phone,
                street_address: streetAddress,
                city,
                zipcode,
                state,
                description,
                business_type: type
            }

            const data = await dispatch(createBusinessThunk(business))
        if(data){
            dispatch(getSingleBusinessThunk(data.id))
            history.push(`/business/${data.id}`)
        }
    }

    if(!User){
        history.push('/')
    }
    const imageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const res = await dispatch(createPreviewImageThunk(formData))
    if(res && res.url){
    setImage(res.url)
    } else{
    setValidationErrors(['Please select a jpg or pdf image file'])
    }
    }

    return (
        <form className="CreateFormbiz" onSubmit={handleSubmit}>
            <div className="side">
        {validationErrors.map((error, ind) => (
          <div className="bold" key={ind}>{error}</div>
        ))}
      </div>
            <h2>Buisness Information</h2>
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
                    placeholder="Phone Number"
                    type="number"
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
                    type="number"
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
            <label className="aws-holder">
        <center>
        <h5 className="bold">Upload Your Business Image</h5>
        </center>
        <div className="aws-input">
          <input
            type="file"
            className="file-drop"
            accept="file/*"
            encType="multipart/form-data"
            onChange={imageUpload}
            required
          />
        </div>
            </label>
            <label>
            <center>
        <h5 className="bold"> Business Type</h5>
        </center>
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
            <div className="spaced">
            <span className="newButton" onClick={() => handleSubmit()} type="submit" disabled={validationErrors.length}>Create</span>
            </div>
        </form>

    )
}
