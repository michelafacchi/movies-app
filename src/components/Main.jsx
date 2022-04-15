import { getDefaultNormalizer } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import Card from './Card';

let API_key="&api_key=27d6ae958830658e749c0901e3276382";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Cult", "Musical", "Drammatici", "Commedie", "Bambini"];

function Main() {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState();

    useEffect(() => {
        fetch(url_set).then(res => res.json()).then(data => { //chiamata fetch
            //console.log(data.results);     -> si vedono in console
            setData(data.results);
        });
    }, [url_set]);

    const getData = (movieType) => {         //categorie di film fornite da themoviedb.org
        if (movieType == "Cult") {
            url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
        }
        if (movieType == "Musical") {
            url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
        }
        if (movieType == "Drammatici") {
            url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
        }
        if (movieType == "Commedie") {
            url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
        }
        if (movieType == "Bambini") {
            url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
            setUrl(url);
            setSearch(" ");
        }
        setUrl(url);
    };


    //tentativo di motore di ricerca con nome film. Ci abbiamo provato. 
    
    /* const searchMovie(evt) => {     
        if(evt.key=="Enter")
         {
             //console.log("prova");
             url=base_url+"/search/movie?api_key=27d6ae958830658e749c0901e3276382&query="+search;
             setUrl(url);
             setSearch(" ");
         }
    } */

    return(
        <>
        <div className="header">
            <nav>
                <ul>
                    {
                        arr.map((value) => {
                          return (
                            <li> <a href="#" name={value} onClick={(e) => { getData(e.target.name)}}> {value} </a></li>
                            )
                       })
                }
            </ul>
        </nav>

         <form>
            {/*<div className="search-btn">
                <input type="text" placeholder="Cerca il film"     //tentativo di motore di ricerca film per nome
                    className="inputText" onChange={(e) => { setSearch(e.target.value)}}
                    value={search} onKeyPress={""}>
                </input>
                <button><i class="fas fa-search"></i></button>
            </div>*/}
        </form>

            </div>
            <div className='container'>
                {
                    (movieData.length==0)?<p className='notfound'>Not Found</p>: movieData.map((res, pos)=>{
                        return(
                            <Card info={res} key={pos}/>
                        )
                })
            }
            </div>
        </>
    )
}

export default Main;
