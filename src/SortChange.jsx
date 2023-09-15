import { useEffect, useState } from "react"

const SortChange = ({setSortPref, setTaskUpdate}) => {

    const handleChange = (e) => {
        //console.log(e.target.value)
        setSortPref(e.target.value)
        setTaskUpdate(true)
        //console.log("a")
    }

    return(
        <>
            <div className="ml-12 font-medium border-2 border-green-900 rounded">
                <select onChange={handleChange}>

                    <option key={99} value={99}>Sıralama</option>
                    <option key={0} value={0}>Sort By Favorite</option>
                    <option key={1} value={1}>Sort By Deadline</option>
                </select>

            </div>
        </>
    )

}
export default SortChange