import React from 'react'

const Employee = () => {
  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
           <p>employee page</p>
        </motion.div>
  )
}

export default Employee