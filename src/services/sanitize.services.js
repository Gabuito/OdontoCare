export class SanitizeData {
    
    static sanitizePrice(value) {
        if (typeof value !== 'number') throw new Error(`Invalid input: Expected number but received ${typeof value}`);
        const [intPart, decimalPart] = value.toFixed(2).split('.');
        return intPart + decimalPart;
    }

    static sanitizeName(value) {
        if (typeof value !== 'string') throw new Error(`Invalid input: Expected string but received ${typeof value}`);
        if (!value.trim()) return '';
        return value.trim().replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
    }

    static sanitizeEmail(value) {
        if (typeof value !== 'string') throw new Error(`Invalid input: Expected string but received ${typeof value}`);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) throw new Error("Invalid Email format");
        return value.trim().toLowerCase();
    }

    static sanitizeCPF(value) {
        if (typeof value !== 'string') throw new Error(`Invalid input: Expected string but received ${typeof value}`);
        return value.replace(/\D/g, '');
    }

    static formatCPF(value) {
        if (typeof value !== 'string' || (value.length !== 11 && value.length !== 14)) {
            throw new Error(`Invalid input: Expected string with 11 or 14 characters but received ${typeof value} with ${value.length} characters`);
        }
        const formatCPF = v => v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        const formatCNPJ = v => v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return value.length === 14 ? formatCNPJ(value) : formatCPF(value);
    }

    static sanitizePhone(value) {
        if (typeof value !== 'string') throw new Error(`Invalid input: Expected string but received ${typeof value}`);
        return value.replace(/\D/g, '');
    }

    static formatPhone(value) {
        if (typeof value !== 'string' || (value.length !== 10 && value.length !== 11)) {
            throw new Error(`Invalid input: Expected string with 10 or 11 characters but received ${typeof value} with ${value.length} characters`);
        }
        const formatPhone = v => v.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
        return formatPhone(value);
    }

    static sanitizeCEP(value) {
        if (typeof value !== 'string') throw new Error(`Invalid input: Expected string but received ${typeof value}`);
        return value.replace(/\D/g, '');
    }

    static formatCEP(value) {
        if (typeof value !== 'string' || value.length !== 8) throw new Error(`Invalid input: Expected string with 8 characters but received ${typeof value} with ${value.length} characters`);
        return value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    static toBinaryUUID(uuid) {
        const bytes = uuidParse(uuid);
        return Buffer.from(bytes);
    }

    // Converte Buffer para string UUID
    static toStringUUID(buffer) {
        if (!buffer) return null;
        const bytes = new Uint8Array(buffer);
        return uuidStringify(bytes);
    }
}

export default SanitizeData;    
