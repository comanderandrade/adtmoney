import React from "react";
import IncomeImg from "../../assets/income.svg";
import OutComeImg from "../../assets/outcome.svg";
import Total from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";


export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    });

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="Icon Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}

                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutComeImg} alt="Icon Saídas" />
                </header>
                <strong>-{new Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}

                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={Total} alt="Icon Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}

                </strong>
            </div>
        </Container>
    )

}