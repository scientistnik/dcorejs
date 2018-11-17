import BigNumber from "bignumber.js"

//https://github.com/DECENTfoundation/DECENT-Network/blob/master/libraries/chain/include/graphene/chain/protocol/operations.hpp#L47-L93
const operations = [
  "transfer_operation",
  "account_create_operation",
  "account_update_operation",
  "asset_create_operation",
  "asset_issue_operation",
  "asset_publish_feed_operation",
  "miner_create_operation",
  "miner_update_operation",
  "miner_update_global_parameters_operation",
  "proposal_create_operation",
  "proposal_update_operation",
  "proposal_delete_operation",
  "withdraw_permission_create_operation",
  "withdraw_permission_update_operation",
  "withdraw_permission_claim_operation",
  "withdraw_permission_delete_operation",
  "vesting_balance_create_operation",
  "vesting_balance_withdraw_operation",
  "custom_operation",
  "assert_operation",
  "content_submit_operation",
  "request_to_buy_operation",
  "leave_rating_and_comment_operation",
  "ready_to_publish_operation",
  "proof_of_custody_operation",
  "deliver_keys_operation",
  "subscribe_operation",
  "subscribe_by_author_operation",
  "automatic_renewal_of_subscription_operation",
  "report_stats_operation",
  "set_publishing_manager_operation",
  "set_publishing_right_operation",
  "content_cancellation_operation",
  "asset_fund_pools_operation",
  "asset_reserve_operation",
  "asset_claim_fees_operation",
  "update_user_issued_asset_operation",
  "update_monitored_asset_operation",
  "ready_to_publish2_operation",
  "transfer2_operation",
  "update_user_issued_asset_advanced_operation",
  "disallow_automatic_renewal_of_subscription_operation",
  "return_escrow_submission_operation",
  "return_escrow_buying_operation",
  "pay_seeder_operation",
  "finish_buying_operation",
  "renewal_of_subscription_operation"
]

export default class Fees {
  static init(db) {
    this.db = db

    if (this.instance)
      return this.instance

    this.instance =  new this();
    return this.instance
  }

  async update() {
    let obj = (await Fees.db.get_global_properties()).parameters.current_fees;
    obj.parameters.forEach((param, index) => {
      this[operations[index]] = param[1].fee ? Number(BigNumber(param[1].fee)
        .div(10 ** 5).toString()) : param[1]
    })
  }

  operations(index) {
    if (index)
      return operations[index];
    else
      return operations;
  }
}
