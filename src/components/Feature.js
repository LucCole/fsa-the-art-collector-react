import React, { Fragment } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';


const Searchable = (props) => {
  const searchTerm = props.searchTerm;
  const searchValue = props.searchValue;
  const setIsLoading = props.setIsLoading;
  const setSearchResults = props.setSearchResults;

    return <span className="content">
        <a href="#" onClick={async (event) => {
            event.preventDefault()
            setIsLoading(true)

            try {
                const queryResluts = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
                setSearchResults(queryResluts)
            }
            catch (error) {
                console.error(error)
            }
            finally {
                setIsLoading(false)
            }
        }}>{searchValue}</a>
    </span>

}


const Feature = (props) => {

    const featuredResult = props.featuredResult
    const setIsLoading = props.setIsLoading
    const setSearchResults = props.setSearchResults


    if(featuredResult){

        const title = featuredResult.title, 
        dated = featuredResult.dated

        return (
        <main id="feature">
            <div className="object-feature">
            <header>
                <h3>{title}</h3>
            <h4>{dated}</h4>
            </header>
            
            {
            
            <section className="facts">

                {/* Description */}
                {featuredResult.description
                ? 
                <>
                    <span className="title">Description</span>
                    <span className="content">{featuredResult.description}</span>
                </>
                : null}

                {/* Culture */}
                {featuredResult.culture
                ? 
                <>
                    <span className="title">Culture</span>
                    <Searchable searchTerm='culture' searchValue={featuredResult.culture} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                </>
                : null}

                {/* Style */}
                {featuredResult.style
                ? 
                <>
                    <span className="title">Style</span>
                    <span className="content">{featuredResult.style}</span>
                </>
                : null}

                {/* Technique */}
                {featuredResult.technique
                ? 
                <>
                    <span className="title">Technique</span>
                    <Searchable searchTerm='technique' searchValue={featuredResult.technique} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                </>
                : null}

                {/* Medium */}
                {featuredResult.medium
                ? 
                <>
                    <span className="title">Medium</span>
                    <Searchable searchTerm='medium' searchValue={featuredResult.medium.toLowerCase()} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                </>
                : null}

                {/* Dimensions */}
                {featuredResult.dimensions
                ? 
                <>
                    <span className="title">Dimensions</span>
                    <span className="content">{featuredResult.dimensions}</span>
                </>
                : null}

                {/* People */}
                {featuredResult.people
                ? 
                <>
                    <span className="title">People</span>
                    {featuredResult.people.map((person) => {
                        return <Searchable searchTerm='person' searchValue={person.displayname} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                    })}
                </>
                : null}

                {/* Department */}
                {featuredResult.department
                ? 
                <>
                    <span className="title">Department</span>
                    <span className="content">{featuredResult.department}</span>
                </>
                : null}

                {/* Division */}
                {featuredResult.division
                ? 
                <>
                    <span className="title">Division</span>
                    <span className="content">{featuredResult.division}</span>
                </>
                : null}

                {/* Contact */}
                {featuredResult.contact
                ? 
                <>
                    <span className="title">Contact</span>
                    <span className="content"><a target="_blank" href={`mailto:${featuredResult.contact}`}>{featuredResult.contact}</a></span>
                </>
                : null}

                {/* Creditline */}
                {featuredResult.creditline
                ? 
                <>
                    <span className="title">Creditline</span>
                    <span className="content">{featuredResult.creditline}</span>
                </>
                : null}
                
            </section> }

            <section className="photos">

                {
                    featuredResult.images ? 
                    featuredResult.images.map((image) => {
                        return <img src={image.baseimageurl} alt={image.description}/>
                    })
                    : featuredResult.primaryimageurl ?
                    <img src={featuredResult.primaryimageurl} alt='Main Picture' />
                    : null
                }

            </section> 
            </div>
        </main>
        )
    }

    return <main id="feature"></main>
}

export default Feature;