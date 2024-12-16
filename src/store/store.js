import { configureStore } from '@reduxjs/toolkit'
import profileSlice from '../Routs/Profile/ProfileSlice'
import catalogSlice from '../Routs/Catalog/CatalogSlice' 
export default configureStore({
    reducer: {
        profile: profileSlice,
        catalog: catalogSlice
    }
})