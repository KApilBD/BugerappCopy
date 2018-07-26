export const updateObject = (oldObject, updatedProperties) =>{
    return{
        ...oldObject,
        ...updateObject,
    };
};