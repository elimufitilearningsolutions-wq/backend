

export const handleValidationError = (res, errors) => {
    return res.status(400).json({ errors: errors.array() });
};

export const handleDatabaseError = (res, err) => {
    console.error("Error inserting data into database:", err);
    return res.status(500).json({ errorMessage: "Failed to create resource." });
};
