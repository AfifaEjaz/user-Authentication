import { NavLink, useNavigate } from 'react-router-dom';
import { useGetLoggedDataQuery } from '../services/UserAuthApi';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    return (
        <>
            <div className="container mt-5">
                <h1>Dashboard</h1>
                <hr />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorem necessitatibus maxime, fugit sed vero. Cum, quae expedita! Totam excepturi minima odit ullam! Fuga quae necessitatibus blanditiis corporis soluta cupiditate accusantium aspernatur autem ratione? Sunt, mollitia illum, commodi repudiandae consequatur numquam necessitatibus corrupti vero beatae quasi illo voluptates modi. Tenetur eos enim nobis minus perspiciatis expedita soluta omnis, exercitationem optio deserunt molestiae esse dolorem reiciendis. Neque voluptates illo sit cupiditate. Autem quisquam, fugiat maiores a sapiente praesentium repudiandae perspiciatis exercitationem commodi eius excepturi laborum iusto, mollitia corporis odit non quae nesciunt dolor pariatur omnis facilis est. Deserunt explicabo consequuntur tenetur?</p>
            </div>
        </>
    )
}

export default Dashboard