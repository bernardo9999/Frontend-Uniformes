export interface Lote {
    lote: {
        lote_id: string;
        status_compras: string;
        status_fabricante: string;
        status_transportadora: string;
        status_cd: string;
        status_fornecedor: string;
        quantidade_compras: number;
        valida_quantidade_fabricante: boolean;
        qualidade_fabricante: string;
        valida_qualidade_cd: boolean;
        data_inicio_compras: string;
        data_inicio_fabricante: string;
        data_inicio_transportadora: string;
        data_inicio_cd: string;
        data_inicio_fornecedor: string;
        data_fim_fabricante: string;
        data_fim_transportadora: string;
        data_fim_cd: string;
        data_estimada_fabricante: string;
        data_estimada_transportadora: string;
        data_estimada_cd: string;
        asset_owner: string;
        uniforme: {
            area: string;
            data: string;
            funcionario: string;
            matricula: string;
            rfid: string;
            status: string;
        }
    }
}