import React, { useState } from 'react';

export default function SettingsTab() {

  const [msg, setMsg] = useState('');
  const [countryName, setCountryName] = useState('');

  const onCountryChange = (e: any) => {
    setCountryName(e.target.value);
    setMsg(/^[a-zA-Z]+$/.test(e.target.value) ? '' : 'Invalid country name');
  }

  const onSave = (e: any) => {
    e.preventDefault();
    if (msg.length < 1) {
      localStorage.setItem('default-country-name', countryName);
      window.location.reload();
    }
  }

  return <div className="container">
    <form onSubmit={onSave}>
      <label className="mb-10">CHANGE HOME COUNTRY:</label>

      <input type="text" name="country"
        className="w-100 mt-10"
        onChange={onCountryChange}
        value={countryName}
        placeholder="usa, tunisia.."
        required
      />

      <div className="w-100 d-flex">
        <button type="submit" className="mr-10">Save</button>
        <button type="reset" className="ml-10 bg-red">reset</button>
      </div>
    </form>

    {msg.length > 10 && <div className="w-100 fs-12 bg-red py-10">{msg}</div>}
  </div>
}
