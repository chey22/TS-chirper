import * as React from 'react';
import { useParams } from 'react-router-dom';

const Admin: React.FC<AdminProps> = () => {

    const { id } = useParams(); //gets the :id value out of url
    return (
         //gets the :id value out of url
        <div>
            <h1 className="text-center">Admin View {id}</h1>
        </div>
    );
};

interface AdminProps {}

export default Admin;