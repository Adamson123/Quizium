import React from "react";
import { useParams } from "react-router";

const CreateQuestionPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1 className="text-4xl">{id}</h1>
        </div>
    );
};

export default CreateQuestionPage;
