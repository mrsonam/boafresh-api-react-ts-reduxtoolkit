import React from 'react';
import logo from '../logo.svg';
import { Counter } from '../../features/counter/Counter';
import { useGetHomeQuery } from '../../services/home';


const Home: React.FC = (): JSX.Element => {
    const { data, error, isLoading } = useGetHomeQuery();
    return (
        <div>
            {isLoading ? (
                <> Loading </>
            ) : data ? (
                data.data.map((category) => {
                    return console.log(category);
                })
            ) : (
                <></>
            )}
        </div>
    );
};

export default Home;
