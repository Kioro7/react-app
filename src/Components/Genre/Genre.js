import { useEffect } from 'react'

export let genre = [{}]

const Genre = () => {
    useEffect(() => {
        const getGenres = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/genres/", requestOptions)

                .then(response => response.json())
                .then((data) => {
                        console.log('Data:', data)
                        genre = data
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getGenres()
    })
}
export default Genre