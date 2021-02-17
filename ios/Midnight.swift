// Midnight.swift

import Foundation

@objc(Midnight)
class Midnight: RCTEventEmitter {
    // MARK: RN Exposed Methods
    
    // This method should be removed when updating UI side as its more of a placeholder
    @objc(multiply:withB:resolver:rejecter:)
    func multiply(
        _ a: Double,
        withB b: Double,
        resolver resolve: RCTPromiseResolveBlock,
        rejecter reject: RCTPromiseRejectBlock
    ) {
        resolve(a * b)
    }

    @objc func subscribe() {
        NotificationCenter
            .default
            .addObserver(self, selector: #selector(sendDayChangedEvent), name: .NSCalendarDayChanged, object: nil)
    }

    @objc func unsubscribe() {
        NotificationCenter
            .default
            .removeObserver(self, name: .NSCalendarDayChanged, object: nil)
    }
    
    @objc func postNotification() {
        NotificationCenter
            .default
            .post(.init(name: .NSCalendarDayChanged))
    }

    // MARK: Public Methods
    @objc override func supportedEvents() -> [String]! {
        ["dayChanged"]
    }
    
    // MARK: Private Methods
    @objc private func sendDayChangedEvent() {
        sendEvent(withName: "dayChanged", body: nil)
    }
}
