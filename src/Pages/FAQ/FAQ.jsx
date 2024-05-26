import React, { useState } from 'react';
import './FAQ.css';
import Navbar from '../../components/Navbar/Navbar';
// Component to display individual FAQ item
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <button className="faq-question" onClick={toggle}>
                {question}
            </button>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};

// Main FAQ page component
const FAQPage = () => {
    const faqs = [
        { question: "Qui peut voter aux élections législatives ?", answer: "Tout citoyen marocain âgé de plus de 18 ans inscrit sur les listes électorales." },
        { question: "Quelles sont les conditions de candidature ?", answer: "Les députés sont élus au suffrage universel direct dans le cadre de circonscriptions législatives." },
        { question: "Quel est le rôle d'un député ?", answer: "Les députés représentent le peuple français, participent à la législation et au contrôle du gouvernement." },
        { question: "Combien de temps dure le mandat d'un député ?", answer: "Le mandat d'un député dure cinq ans." },
        { question: "Comment puis-je voter si je suis à l'étranger ?", answer: "Les citoyens marocain résidant à l'étranger peuvent voter par correspondance ou dans les ambassades et consulats." }
    ];

    return (
        <div className='VotingPageContainer'>
        <div className="faq-page">
                    <Navbar/>
            <h1>FAQ - Élections Législatives</h1>
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
        </div>
    );
};

export default FAQPage;
