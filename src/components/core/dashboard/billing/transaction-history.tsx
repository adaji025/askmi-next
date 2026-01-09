"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface Transaction {
  id: string
  campaign: string
  expectedVotes: string
  votesGotten: string
  amount: string
  status: "Paid" | "Pending"
  date: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Paid",
    date: "Nov 2, 2025",
  },
  {
    id: "2",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Paid",
    date: "Nov 2, 2025",
  },
  {
    id: "3",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Pending",
    date: "Nov 2, 2025",
  },
  {
    id: "4",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Pending",
    date: "Nov 2, 2025",
  },
  {
    id: "5",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Pending",
    date: "Nov 2, 2025",
  },
  {
    id: "6",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Paid",
    date: "Nov 2, 2025",
  },
]

export function TransactionHistory() {
  const t = useTranslations("billing.transactionHistory");

  const handleDownloadInvoice = (transactionId: string) => {
    // TODO: Implement actual invoice download logic
    // This could call an API endpoint to generate/download the invoice PDF
    console.log("Downloading invoice for transaction:", transactionId);
    // Example: window.open(`/api/invoices/${transactionId}/download`, '_blank');
  };

  return (
    <div className="w-full space-y-4 bg-white rounded-md">
      <h2 className="font-bold text-foreground">{t("title")}</h2>
      <div className="rounded-xl border border-border bg-card overflow-auto">
        <Table>
          <TableHeader className="bg-muted/30 border-none">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("headers.campaign")}
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("headers.expectedVotes")}
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("headers.votesGotten")}
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("headers.amount")}
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("headers.status")}
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {t("headers.date")}
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                {t("headers.invoice")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/20 border-border">
                <TableCell className="py-5 px-6 font-bold text-foreground">{transaction.campaign}</TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground text-center">
                  {transaction.expectedVotes}
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground text-center">{transaction.votesGotten}</TableCell>
                <TableCell className="py-5 px-6 font-bold text-foreground text-center">{transaction.amount}</TableCell>
                <TableCell className="py-5 px-6 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-3 py-1 rounded-md text-[11px] font-medium border",
                      transaction.status === "Paid"
                        ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-50"
                        : "bg-orange-50 text-orange-400 border-orange-100 hover:bg-orange-50",
                    )}
                  >
                    {transaction.status === "Paid" ? t("status.paid") : t("status.pending")}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground text-right">{transaction.date}</TableCell>
                <TableCell className="py-5 px-6 text-center">
                  {transaction.status === "Paid" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadInvoice(transaction.id)}
                      className="h-8 w-8 p-0 hover:bg-muted"
                      title={t("downloadInvoice")}
                    >
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
