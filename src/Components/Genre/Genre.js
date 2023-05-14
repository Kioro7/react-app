import { useEffect } from 'react'

const Genre = ({setGenres}) => {
    useEffect(() => {
        const getGenres = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/genres/", requestOptions)

                .then(response => response.json())
                .then((data) => {
                        console.log('Data:', data)
                        setGenres(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getGenres()
    }, [setGenres])
}
export default Genre