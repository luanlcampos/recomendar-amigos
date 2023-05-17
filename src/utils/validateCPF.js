const validateCPF = (cpf) => {
    return cpf.length === 11 && !isNaN(cpf);
}

exports.validateCPF = validateCPF;
