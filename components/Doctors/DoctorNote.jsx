
import React, { useState } from 'react';

const DoctorNote = ({ patientId, cancel, doctor, item, save }) => {
    const [note, setNote] = useState('');



    const handleNoteChange = (event) => {
        setNote(event.target.value);

    };

    function getCheckedBoxes(chkboxName) {
        var checkboxes = document.getElementsByName(chkboxName);
        var checkboxesChecked = [];
        // loop over them all
        for (var i = 0; i < checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].value);
            }
        }
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can add the logic to save the note to the database
        let medicine = (getCheckedBoxes('medicine[]'));

        fetch('/api/appointment/save', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item._id,
                status: 'done',
                note: note,
                prescription: medicine,
                checkedBy: doctor.email
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    alert('Checked Successfully')
                    console.log(data)
                    save()
                } else {
                    alert('Something went wrong, ' + data.message)
                }
            })

        setNote('');

    };

    return (
        <div className='absolute h-screen w-full flex justify-center items-center bg-black bg-opacity-90  top-0 left-0 z-50'>
            <div className="flex max-w-xl flex-col bg-slate-800 rounded gap-3 p-3">
                <h2 className='p-2 font-bold text-2xl'>Add Note for Patient {patientId.name}</h2>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <label htmlFor="">
                        Medicine to be used
                    </label>
                    <div className="flex flex-wrap gap-2">
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="Paracetamol Plus" /> Paracetamol Plus</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="CoughEaze Syrup" /> CoughEaze Syrup</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="AntibioGuard Capsules" /> AntibioGuard Capsules</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="PainRelief 500mg Tablets" /> PainRelief 500mg Tablets</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="ColdCure Drops" /> ColdCure Drops</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="AllerXyz Allergy Relief" /> AllerXyz Allergy Relief</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="DigestiCare Probiotics" /> DigestiCare Probiotics</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="HeadacheNoMore Pills" /> HeadacheNoMore Pills</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="SleepWell Nighttime Aid" /> SleepWell Nighttime Aid</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="VitalVitamin C Supplements" /> VitalVitamin C Supplements</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="SkinGlow Beauty Capsules" /> SkinGlow Beauty Capsules</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="HeartGuard Cardio Support" /> HeartGuard Cardio Support</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="MuscleMax Pain Cream" /> MuscleMax Pain Cream</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="BloodPressure Balancer" /> BloodPressure Balancer</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="AllergyShield Nasal Spray" /> AllergyShield Nasal Spray</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="BreatheEasy Inhaler" /> BreatheEasy Inhaler</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="JointFlex Glucosamine" /> JointFlex Glucosamine</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="DigestiClean Fiber Powder" /> DigestiClean Fiber Powder</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="EyeBright Vision Drops" /> EyeBright Vision Drops</label>
                        <label className="medicine-label"><input type="checkbox" name="medicine[]" value="ImmunoBoost Echinacea" /> ImmunoBoost Echinacea</label>

                    </div>
                    <label>
                        Note:
                        <input className='text-white outline-none p-2 w-full' type="text" onChange={(e) => handleNoteChange(event)} />
                    </label>
                    <button className='btn btn-primary' type="submit">Save Note</button>
                    <button className='btn btn-danger' onClick={cancel} >Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default DoctorNote;
