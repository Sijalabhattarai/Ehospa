export default async function handler(req, res) {
    const { message } = req.body


    const physician = [
        "fever",
        "headache",
        "cough",
        "sore throat",
        "runny nose",
        "stomach ache",
        "diarrhea",
    ]

    const dentist = [
        "toothache",
        "bleeding gums",
        "bad breath",
        "tooth sensitivity",
        "tooth decay",
        "dry mouth",
        "mouth sores",
    ]

    const Ophthalmologist = [
        "blurry vision",
        "dry eyes",
        "watery eyes",
        "red eyes",
        "itchy eyes",
        "eye pain",
        "double vision",
    ]

    const Dermatologist = [
        "acne",
        "rash",
        "dry skin",
        "itchy skin",
        "hair loss",
        "warts",
        "cold sores",
    ]

    const psycatrist = [
        "anxiety",
        "depression",
        "stress",
        "insomnia",
        "bipolar disorder",
        "schizophrenia",
        "eating disorders",
    ]

    const cardiologist = [
        "chest pain",
        "shortness of breath",
        "palpitations",
        "high blood pressure",
        "high cholesterol",
        "heart attack",
        "heart failure",
    ]

    const neurologist = [
        "headache",
        "migraine",
        "seizures",
        "dizziness",
        "weakness",
        "numbness",
        "tingling",
    ]

    const gynecologist = [
        "irregular periods",
        "painful periods",
        "heavy periods",
        "missed periods",
        "vaginal discharge",
        "vaginal bleeding",
        "vaginal itching",
    ]

    const urologist = [
        "urinary incontinence",
        "urinary tract infection",
        "kidney stones",
        "erectile dysfunction",
        "prostate problems",
        "testicular pain",
        "testicular swelling",
    ]

    const gastroenterologist = [
        "heartburn",
        "indigestion",
        "nausea",
        "vomiting",
        "diarrhea",
        "constipation",
        "abdominal pain",
    ]



    const specialists = [

        { name: 'Physician', symptoms: physician },
        { name: 'Dentist', symptoms: dentist },
        { name: 'Ophthalmologist', symptoms: Ophthalmologist },
        { name: 'Dermatologist', symptoms: Dermatologist },
        { name: 'Psycatrist', symptoms: psycatrist },
        { name: 'Cardiologist', symptoms: cardiologist },
        { name: 'Neurologist', symptoms: neurologist },
        { name: 'Gynecologist', symptoms: gynecologist },
        { name: 'Urologist', symptoms: urologist },
        { name: 'Gastroenterologist', symptoms: gastroenterologist },

    ];

    for (let specialist of specialists) {
        for (let symptom of specialist.symptoms) {
            if (message.toLowerCase().includes(symptom)) {
                console.log(specialist.name);
            }
        }
    }

    const specialist = specialists.find(specialist => specialist.symptoms.some(symptom => message.toLowerCase().includes(symptom)));

    if (specialist) {
        return res.status(200).json({ status: true, data: specialist.name })
    } else {
        return res.status(200).json({ status: false, data: 'Sorry, I can\'t understand you. Please Elaborate' })
    }


}