package com.tems.dto;

import com.tems.model.Approval;

public class ApprovalMapper {

    public static ApprovalResponseDTO toDTO(Approval approval) {

        ApprovalResponseDTO dto = new ApprovalResponseDTO();

        dto.setApprovalId(approval.getApprovalId());

        dto.setExpenseId(approval.getExpense().getExpenseId());
        dto.setExpenseTitle(approval.getExpense().getTitle());

        dto.setApproverId(approval.getApprover().getUserId());
        dto.setApproverName(approval.getApprover().getUserName());

        dto.setStatus(approval.getStatus());
        dto.setComments(approval.getComments());
        dto.setApprovedAt(approval.getApprovedAt());

        return dto;
    }
}